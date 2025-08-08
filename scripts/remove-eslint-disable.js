import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GENERATED_DIR = join(__dirname, '..', 'src', 'generated');

function processFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Handle the exact format seen in the generated files
    // This matches the first 4 lines and removes the eslint-disable line
    content = content.replace(
      /^(\/\* generated using openapi-typescript-codegen -- do not edit \*\/\r?\n\/\* istanbul ignore file \*\/\r?\n\/\* tslint:disable \*\/\r?\n\/\* eslint-disable \*\/\r?\n)/,
      '/* generated using openapi-typescript-codegen -- do not edit */\n/* istanbul ignore file */\n/* tslint:disable */\n'
    );
    
    // Only write the file if it was modified
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      if (process.env.NODE_ENV !== 'production') {
        console.info(`Modified: ${filePath}`);
      }
      return true;
    }
    return false;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error processing ${filePath}:`, error);
    }
    return false;
  }
}

function processDirectory(directory) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`Processing directory: ${directory}`);
  }
  
  try {
    const files = readdirSync(directory, { withFileTypes: true });
    
    if (process.env.NODE_ENV !== 'production') {
      console.info(`Found ${files.length} items in ${directory}`);
    }
    
    let count = 0;
    
    for (const file of files) {
      const fullPath = join(directory, file.name);
      
      if (process.env.NODE_ENV !== 'production') {
        console.info(`Processing: ${fullPath} (${file.isDirectory() ? 'directory' : 'file'})`);
      }
      
      if (file.isDirectory()) {
        count += processDirectory(fullPath);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        if (process.env.NODE_ENV !== 'production') {
          console.info(`Found TypeScript file: ${fullPath}`);
        }
        if (processFile(fullPath)) {
          if (process.env.NODE_ENV !== 'production') {
            console.info(`Modified: ${fullPath}`);
          }
          count++;
        }
      }
    }
    
    return count;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error reading directory ${directory}:`, error);
    }
    return 0;
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.info('Removing unused eslint-disable directives from generated files...');
}
const modifiedCount = processDirectory(GENERATED_DIR);
if (process.env.NODE_ENV !== 'production') {
  console.info(`Done! Processed ${modifiedCount} files.`);
}
