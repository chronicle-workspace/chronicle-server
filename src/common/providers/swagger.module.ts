import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("REST API Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .addServer("http://localhost:3000")
    .addServer("https://chronicle.seogaemo.com/api")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("document", app, document, {
    jsonDocumentUrl: "/document-json",
  });
}
