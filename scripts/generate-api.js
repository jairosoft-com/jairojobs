const fs = require('fs');
const path = require('path');

const { generate } = require('openapi-typescript-codegen');

async function main() {
  console.log('Starting API client generation...');
  
  const input = path.resolve(__dirname, '../API Doc/openapi.yaml');
  const output = path.resolve(__dirname, '../src/generated/jobs-api');
  
  console.log('Input file path:', input);
  console.log('Output directory path:', output);
  
  // Check if input file exists
  if (!fs.existsSync(input)) {
    console.error(`Error: Input file does not exist at ${input}`);
    process.exit(1);
  }
  
  // Ensure output directory exists
  console.log('Ensuring output directory exists...');
  if (!fs.existsSync(output)) {
    console.log('Creating output directory...');
    try {
      fs.mkdirSync(output, { recursive: true });
      console.log('Output directory created successfully');
    } catch (err) {
      console.error('Error creating output directory:', err);
      process.exit(1);
    }
  } else {
    console.log('Output directory already exists');
  }

  console.log('Starting API client generation with the following options:');
  const options = {
    input,
    output,
    clientName: 'JobsApiClient',
    useOptions: true,
    useUnionTypes: true,
    exportCore: true,
    exportServices: true,
    exportModels: true,
    exportSchemas: true,
    request: 'node-fetch',
  };
  console.log(JSON.stringify(options, null, 2));

  try {
    console.log('Generating API client...');
    await generate(options);
    
    console.log('API client generated successfully!');
    console.log('Output directory contents:', fs.readdirSync(output));
  } catch (error) {
    console.error('Error generating API client:');
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main().catch(console.error);
