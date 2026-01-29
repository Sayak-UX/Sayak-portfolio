import xml.etree.ElementTree as ET
import os
import copy

def embed_svg(foreground_path, background_path, output_path):
    ET.register_namespace('', "http://www.w3.org/2000/svg")
    ET.register_namespace('xlink', "http://www.w3.org/1999/xlink")
    
    print(f"Parsing foreground: {foreground_path}")
    fg_tree = ET.parse(foreground_path)
    fg_root = fg_tree.getroot()
    
    print(f"Parsing background: {background_path}")
    bg_tree = ET.parse(background_path)
    bg_root = bg_tree.getroot()
    
    # Create a new SVG element to hold the background content
    # We use a nested <svg> to handle scaling and viewBox independently
    bg_wrapper = ET.Element('{http://www.w3.org/2000/svg}svg')
    
    # Copy attributes from background root to wrapper, but override width/height/x/y
    # We want the background to fill the foreground's view
    
    # Get background viewBox
    bg_viewbox = bg_root.get('viewBox')
    if bg_viewbox:
        bg_wrapper.set('viewBox', bg_viewbox)
    
    # Set dimensions to 100% to fill the parent
    bg_wrapper.set('width', '100%')
    bg_wrapper.set('height', '100%')
    bg_wrapper.set('preserveAspectRatio', 'xMidYMid slice') # Scale to cover
    
    # Copy all children from background to wrapper
    for child in bg_root:
        bg_wrapper.append(child)
        
    # Insert the wrapper as the first child of the foreground
    fg_root.insert(0, bg_wrapper)
    
    print(f"Writing output to: {output_path}")
    fg_tree.write(output_path, encoding='utf-8', xml_declaration=True)
    print("Done.")

if __name__ == "__main__":
    base_dir = r"f:\downloads\sayakda portpholio final webpage\public\assets"
    fg_file = os.path.join(base_dir, "mobile app project1.svg")
    bg_file = os.path.join(base_dir, "Project ! mobile bank app.svg")
    
    if not os.path.exists(fg_file):
        print(f"Error: Foreground file not found: {fg_file}")
    elif not os.path.exists(bg_file):
        print(f"Error: Background file not found: {bg_file}")
    else:
        embed_svg(fg_file, bg_file, fg_file)
