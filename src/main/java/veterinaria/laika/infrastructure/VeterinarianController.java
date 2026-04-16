package veterinaria.laika.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.Veterinarian;
import veterinaria.laika.domain.VeterinarianRepository;
import java.util.List;

@RestController
@RequestMapping("/api/veterinarians")
public class VeterinarianController {
    private static final Logger log = LoggerFactory.getLogger(VeterinarianController.class);
    private final VeterinarianRepository vetRepository;

    public VeterinarianController(VeterinarianRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    @Operation(summary = "LISTAR VETERINARIOS")
    @GetMapping
    public List<Veterinarian> listar() {
        log.info("Laika Vet: Consultando staff médico");
        return vetRepository.findAll();
    }

    @Operation(summary = "REGISTRAR - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Veterinarian crear(@RequestBody Veterinarian vet) {
        return vetRepository.save(vet);
    }
}