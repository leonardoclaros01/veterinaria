package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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

    @Operation(summary = "LISTAR TODAS LAS MASCOTAS")
    @GetMapping
    public List<Pet> listar() {
        return petRepository.findAll();
    }

    @Operation(summary = "BUSCAR MASCOTA POR ID")
    @GetMapping("/{id}")
    public ResponseEntity<Pet> buscarPorId(@PathVariable Long id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "REGISTRAR MASCOTA - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Pet crear(@RequestBody Pet pet) {
        log.info("Laika Vet: Registrando nueva mascota: {}", pet.getName());
        return petRepository.save(pet);
    }

    @Operation(summary = "EDITAR/ACTUALIZAR MASCOTA")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Pet> actualizar(@PathVariable Long id, @RequestBody Pet petDetalles) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(petDetalles.getName());
            pet.setSpecies(petDetalles.getSpecies());
            pet.setBreed(petDetalles.getBreed());
            pet.setAge(petDetalles.getAge());
            pet.setOwner(petDetalles.getOwner());
            return ResponseEntity.ok(petRepository.save(pet));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "BORRAR MASCOTA")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            log.info("Laika Vet: Mascota eliminada ID: {}", id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}