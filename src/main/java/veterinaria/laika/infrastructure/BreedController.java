package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.Breed;
import veterinaria.laika.domain.BreedRepository;

import java.util.List;

@RestController
@RequestMapping("/api/breeds")
public class BreedController {
    private static final Logger log = LoggerFactory.getLogger(BreedController.class);
    private final BreedRepository breedRepository;

    public BreedController(BreedRepository breedRepository) {
        this.breedRepository = breedRepository;
    }

    @Operation(summary = "LISTAR TODAS LAS RAZAS")
    @GetMapping
    public List<Breed> listar() {
        return breedRepository.findAll();
    }

    @Operation(summary = "BUSCAR RAZAS POR ESPECIE")
    @GetMapping("/species/{species}")
    public List<Breed> listarPorEspecie(@PathVariable String species) {
        return breedRepository.findBySpecies(species);
    }

    @Operation(summary = "BUSCAR RAZA POR ID")
    @GetMapping("/{id}")
    public ResponseEntity<Breed> buscarPorId(@PathVariable Long id) {
        return breedRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "REGISTRAR RAZA - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Breed crear(@RequestBody Breed breed) {
        log.info("Laika Vet: Registrando nueva raza: {}", breed.getName());
        return breedRepository.save(breed);
    }

    @Operation(summary = "EDITAR/ACTUALIZAR RAZA")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Breed> actualizar(@PathVariable Long id, @RequestBody Breed breedDetalles) {
        return breedRepository.findById(id).map(breed -> {
            breed.setName(breedDetalles.getName());
            breed.setSpecies(breedDetalles.getSpecies());
            return ResponseEntity.ok(breedRepository.save(breed));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "BORRAR RAZA")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (breedRepository.existsById(id)) {
            breedRepository.deleteById(id);
            log.info("Laika Vet: Raza eliminada ID: {}", id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
