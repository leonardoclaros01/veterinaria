package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.Veterinarian;
import veterinaria.laika.domain.VeterinarianRepository;
import java.util.List;

@RestController
@RequestMapping("/api/veterinarians")
public class VeterinarianController {
    private final VeterinarianRepository vetRepository;

    public VeterinarianController(VeterinarianRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    @Operation(summary = "LISTAR VETERINARIOS")
    @GetMapping
    public List<Veterinarian> listar() {
        return vetRepository.findAll();
    }

    @Operation(summary = "REGISTRAR VETERINARIO")
    @PostMapping
    public Veterinarian crear(@RequestBody Veterinarian vet) {
        return vetRepository.save(vet);
    }

    @Operation(summary = "EDITAR VETERINARIO")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Veterinarian> actualizar(@PathVariable Long id, @RequestBody Veterinarian detalles) {
        return vetRepository.findById(id).map(vet -> {
            // Sincronizado con tus getters/setters: fullName y licenseNumber
            vet.setFullName(detalles.getFullName());
            vet.setSpecialty(detalles.getSpecialty());
            vet.setLicenseNumber(detalles.getLicenseNumber());
            return ResponseEntity.ok(vetRepository.save(vet));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "BORRAR VETERINARIO")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (vetRepository.existsById(id)) {
            vetRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}