package veterinaria.laika.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.Pet;
import veterinaria.laika.domain.PetRepository;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    private static final Logger log = LoggerFactory.getLogger(PetController.class);
    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Operation(summary = "LISTAR MASCOTAS")
    @GetMapping
    public List<Pet> listar() {
        log.info("Laika Vet: Consultando lista de mascotas");
        return petRepository.findAll();
    }

    @Operation(summary = "REGISTRAR CON DUEÑO - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Pet crear(@RequestBody Pet pet) {
        if (pet.getOwner() != null) {
            log.info("Laika Vet: Registrando mascota {} para el dueño ID {}",
                    pet.getName(), pet.getOwner().getId());
        }
        return petRepository.save(pet);
    }
}