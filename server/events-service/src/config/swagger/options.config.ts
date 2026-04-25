import {DocumentBuilder} from "@nestjs/swagger";

export const swaggerOptions = new DocumentBuilder()
    .setTitle('Events API')
    .setVersion('1.0')
    .setContact("Artem Melnikov", "https://github.com/TemaXo00", "melnikov.artem294@gmail.com")
    .setDescription("API for creating events")
    .build()