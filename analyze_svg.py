import xml.etree.ElementTree as ET
import re

svg_path = r'f:\downloads\sayakda portpholio final webpage\public\assets\website back solar.svg'

def parse_svg():
    try:
        tree = ET.parse(svg_path)
        root = tree.getroot()
        
        ns = {'svg': 'http://www.w3.org/2000/svg'}
        
        print("Root tag:", root.tag)
        
        # Find all rects
        for i, rect in enumerate(root.findall('.//{http://www.w3.org/2000/svg}rect')):
            x = rect.get('x')
            y = rect.get('y')
            w = rect.get('width')
            h = rect.get('height')
            fill = rect.get('fill')
            print(f"Rect {i}: x={x}, y={y}, w={w}, h={h}, fill={fill}")

        # Find all images
        for i, img in enumerate(root.findall('.//{http://www.w3.org/2000/svg}image')):
            x = img.get('x')
            y = img.get('y')
            w = img.get('width')
            h = img.get('height')
            print(f"Image {i}: x={x}, y={y}, w={w}, h={h}")
            
        # Find patterns
        for i, pattern in enumerate(root.findall('.//{http://www.w3.org/2000/svg}pattern')):
            id = pattern.get('id')
            print(f"Pattern {i}: id={id}")
            # Check content of pattern
            for child in pattern:
                print(f"  Pattern child: {child.tag} {child.attrib}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    parse_svg()
