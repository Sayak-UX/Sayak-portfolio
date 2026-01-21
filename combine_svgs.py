import re
import os

# File paths
main_svg_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\mobile app project1.svg'
bank_app_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\Project ! mobile bank app.svg'
output_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\combined_mobile_app.svg'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    print("Reading files...")
    main_svg_content = read_file(main_svg_path)
    bank_app_content = read_file(bank_app_path)

    # 1. Identify the screen rect in the main SVG
    # Target: <rect x="1202" y="189" width="323" height="701" rx="54" ... />
    # We will replace this rect with our new group, or insert after it.
    # Actually, keeping it as a background is good, we place the app on top.
    
    screen_x = 1202
    screen_y = 189
    screen_w = 323
    screen_h = 701
    screen_rx = 54
    
    # Regex to find the specific rect to ensure we have the right insertion point
    # We look for the rect with the specific dimensions
    screen_rect_pattern = r'(<rect\s+x="1202"\s+y="189"\s+width="323"\s+height="701"\s+rx="54"[^>]*/>)'
    match = re.search(screen_rect_pattern, main_svg_content)
    
    if not match:
        print("Error: Could not find the target screen rect in main SVG.")
        return

    print("Found screen rect.")
    
    # 2. Prepare the banking app content
    # Extract content inside <svg> tags
    # We assume standard svg tag structure
    bank_svg_start = bank_app_content.find('>') + 1
    bank_svg_end = bank_app_content.rfind('</svg>')
    
    if bank_svg_start == 0 or bank_svg_end == -1:
        print("Error: Could not parse banking app SVG content.")
        return

    bank_inner_content = bank_app_content[bank_svg_start:bank_svg_end]
    
    # Get dimensions of banking app to calculate scale
    # <svg width="1920" height="25913" viewBox="0 0 1920 25913" ...
    width_match = re.search(r'<svg[^>]*width="([\d\.]+)"', bank_app_content)
    viewbox_match = re.search(r'<svg[^>]*viewBox="[\d\.]+\s+[\d\.]+\s+([\d\.]+)\s+[\d\.]+"', bank_app_content)
    
    bank_width = 1920.0
    if width_match:
        bank_width = float(width_match.group(1))
    elif viewbox_match:
        bank_width = float(viewbox_match.group(1))
        
    print(f"Banking App Width: {bank_width}")
    
    # Calculate scale
    scale = screen_w / bank_width
    print(f"Scale Factor: {scale}")

    # 3. Process IDs to avoid conflicts
    # We will prefix all id="..." and url(#...) with "bank_"
    # Simple regex replacement might be risky if "id" appears in text, but in SVG it's usually an attribute.
    # We'll try a reasonably safe approach.
    
    # Find all IDs defined
    ids = re.findall(r'id="([^"]+)"', bank_inner_content)
    
    # Replace IDs definitions
    processed_bank_content = bank_inner_content
    for old_id in ids:
        new_id = f"bank_{old_id}"
        # Replace id="old_id"
        processed_bank_content = re.sub(f'id="{re.escape(old_id)}"', f'id="{new_id}"', processed_bank_content)
        # Replace url(#old_id)
        processed_bank_content = re.sub(f'url\(#{re.escape(old_id)}\)', f'url(#{new_id})', processed_bank_content)
        # Replace xlink:href="#old_id"
        processed_bank_content = re.sub(f'xlink:href="#{re.escape(old_id)}"', f'xlink:href="#{new_id}"', processed_bank_content)

    # 4. Construct the new SVG elements
    # We need a clipPath definition and the group wrapper
    
    clip_path_id = "screen_clip_mask_bank"
    
    # Define the clip path (same geometry as the screen rect)
    defs_content = f'''
    <defs>
        <clipPath id="{clip_path_id}">
            <rect x="{screen_x}" y="{screen_y}" width="{screen_w}" height="{screen_h}" rx="{screen_rx}" />
        </clipPath>
    </defs>
    '''
    
    # Define the group with transform and clip-path
    # We translate to the screen position and scale
    new_group = f'''
    {defs_content}
    <g clip-path="url(#{clip_path_id})">
        <g transform="translate({screen_x}, {screen_y}) scale({scale})">
            {processed_bank_content}
        </g>
    </g>
    '''
    
    # 5. Insert into main SVG
    # We insert it AFTER the screen rect so it sits on top (or replaces it).
    # The user said "insert ... inside the phone screen area".
    # If we keep the original rect behind, it acts as a background if the app has transparency.
    
    insertion_point = match.end()
    final_svg_content = main_svg_content[:insertion_point] + "\n" + new_group + "\n" + main_svg_content[insertion_point:]
    
    # 6. Save
    write_file(output_path, final_svg_content)
    print(f"Successfully created {output_path}")

if __name__ == "__main__":
    main()
