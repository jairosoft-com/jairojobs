import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { generate } from 'openapi-typescript-codegen';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  if (process.env.NODE_ENV !== 'production') {
    console.info('Starting API client generation...');
  }
  
  const input = path.resolve(__dirname, '../API Doc/openapi.yaml');
  const output = path.resolve(__dirname, '../src/generated/jobs-api');
  
  if (process.env.NODE_ENV !== 'production') {
    console.info('Input file path:', input);
    console.info('Output directory path:', output);
  }
  
  // Check if input file exists
  if (!fs.existsSync(input)) {
    console.error(`Error: Input file does not exist at ${input}`);
    process.exit(1);
  }
  
  // Ensure output directory exists
  if (process.env.NODE_ENV !== 'production') {
    console.info('Ensuring output directory exists...');
  }
  
  if (!fs.existsSync(output)) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('Creating output directory...');
    }
    
    try {
      fs.mkdirSync(output, { recursive: true });
      if (process.env.NODE_ENV !== 'production') {
        console.info('Output directory created successfully');
      }
    } catch (err) {
      console.error('Error creating output directory:', err);
      process.exit(1);
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.info('Output directory already exists');
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('Starting API client generation with the following options:');
  }
  
  const options = {
    input,
    output: path.resolve(__dirname, '../node_modules/jairojobsapi'),
    clientName: 'JobsApi',
    useOptions: true,
    useUnionTypes: true,
    exportCore: true,
    exportServices: true,
    exportModels: true,
    exportSchemas: true,
    request: 'node-fetch',
    name: 'jairojobsapi',
    types: {
      enums: 'typescript',
      type: 'module',
    },
  };
  
  if (process.env.NODE_ENV !== 'production') {
    console.info(JSON.stringify(options, null, 2));
  }

  try {
    if (process.env.NODE_ENV !== 'production') {
      console.info('Generating API client...');
    }
    
    await generate(options);
    
    if (process.env.NODE_ENV !== 'production') {
      console.info('API client generated successfully!');
      console.info('Output directory contents:', fs.readdirSync(output));
    }
  } catch (error) {
    console.error('Error generating API client:');
    if (process.env.NODE_ENV !== 'production') {
      if (error instanceof Error) {
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
      } else {
        console.error(error);
      }
    }
    process.exit(1);
  }
}

main().catch((error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    console.error('An error occurred during API generation');
  }
  process.exit(1);
});
