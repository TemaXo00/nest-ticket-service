import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerTicketsConfig = new DocumentBuilder()
  .setTitle('Tickets API')
  .setVersion('1.0')
  .setContact(
    'Artem Melnikov',
    'https://github.com/TemaXo00',
    'melnikov.artem294@gmail.com',
  )
  .setDescription('API for creating tickets')
  .build();

export const swaggerTicketsUIconfig: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'list',
    filter: true,
    displayRequestDuration: true,
    tagsSorter: 'alpha',
    tryItOutEnabled: true,
    requestSnippetsEnabled: true,
    syntaxHighlight: {
      activated: true,
      theme: 'monokai',
    },
    displayOperationId: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    showExtensions: true,
    showCommonExtensions: true,
    deepLinking: true,
    validatorUrl: null,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
  },
  customCss: `
    .swagger-ui .topbar {display: none !important;}
    `,

  jsonDocumentUrl: 'docs/swagger.json',
  yamlDocumentUrl: 'docs/swagger.yaml',
};
