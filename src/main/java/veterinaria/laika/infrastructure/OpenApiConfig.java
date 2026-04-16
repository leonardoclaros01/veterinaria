package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        // 1. Servidor de Producción (Railway)
        Server productionServer = new Server();
        productionServer.setUrl("https://veterinaria-production-1398.up.railway.app");
        productionServer.setDescription("Servidor de Producción - Railway");

        // 2. Servidor de Desarrollo (Local)
        Server localServer = new Server();
        localServer.setUrl("http://localhost:8080");
        localServer.setDescription("Servidor de Desarrollo Local");

        return new OpenAPI()
                .servers(List.of(productionServer, localServer))
                .info(new Info()
                        .title("Veterinaria Laika API")
                        .version("1.0")
                        .description("Documentación oficial de los servicios de Veterinaria Laika (Mascotas, Usuarios y Veterinarios)"));
    }
}