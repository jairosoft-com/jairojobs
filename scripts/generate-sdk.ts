import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { generate } from 'openapi-typescript-codegen';

// Get the current module's directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateSDK() {
  try {
    const input = resolve(process.cwd(), 'API Doc/openapi.yaml');
    const output = resolve(process.cwd(), 'src/generated/jobs-api');
    
    if (process.env.NODE_ENV !== 'production') {
      console.info('Generating TypeScript SDK from OpenAPI spec...');
      console.info(`Input: ${input}`);
      console.info(`Output: ${output}`);
    }
    
    await generate({
      input,
      output,
      clientName: 'JairoJobsAPI',
      useOptions: true,
      useUnionTypes: true,
      exportCore: true,
      exportSchemas: true,
      exportModels: true,
      exportServices: true,
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.info('SDK generated successfully!');
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error generating SDK:', error);
    } else {
      // In production, we still want to log the error but without the full stack trace
      console.error('Error generating SDK');
    }
    process.exit(1);
  }
}

generateSDK();
