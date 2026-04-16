package veterinaria.laika.controller;

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

    @Operation(summary = "LISTAR MASCOTAS - PÚBLICO")
    @GetMapping
    public List<Pet> listar() {
        log.info("Laika Vet: Consultando lista general de mascotas");
        return petRepository.findAll();
    }

    @Operation(summary = "REGISTRAR MASCOTA - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Pet crear(@RequestBody Pet pet) {
        log.info("Laika Vet: Admin creando mascota: {}", pet.getName());
        return petRepository.save(pet);
    }

    @Operation(summary = "BORRAR MASCOTA - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        log.warn("Laika Vet: Eliminando registro de mascota ID: {}", id);
        petRepository.deleteById(id);
    }
}