import re
import os

# File paths
back_svg_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\website back solar.svg'
project_svg_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\website project 2.svg'
output_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\website_project_2_combined.svg'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    print("Reading files...")
    back_content = read_file(back_svg_path)
    project_content = read_file(project_svg_path)

    # Extract content from background SVG (everything inside <svg> tags)
    back_start = back_content.find('>') + 1
    back_end = back_content.rfind('</svg>')
    
    if back_start == 0 or back_end == -1:
        print("Error: Could not parse background SVG content.")
        return

    back_inner_content = back_content[back_start:back_end]
    
    # Wrap background content in a group to ensure it stays together and can be transformed if needed
    # We'll give it an ID
    back_group = f'<g id="background_layer">{back_inner_content}</g>'

    # Insert background into project SVG
    # We want it to be the first child so it's at the bottom
    # Find the end of the opening <svg ...> tag
    project_svg_tag_end = project_content.find('>') + 1
    
    if project_svg_tag_end == 0:
        print("Error: Could not find opening svg tag in project file.")
        return
        
    # Construct final content
    final_content = project_content[:project_svg_tag_end] + "\n" + back_group + "\n" + project_content[project_svg_tag_end:]
    
    write_file(output_path, final_content)
    print(f"Successfully created {output_path}")

if __name__ == "__main__":
    main()
