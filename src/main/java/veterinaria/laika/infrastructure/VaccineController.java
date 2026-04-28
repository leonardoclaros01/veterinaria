package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.Vaccine;
import veterinaria.laika.domain.VaccineRepository;

import java.util.List;

@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {
    private static final Logger log = LoggerFactory.getLogger(VaccineController.class);
    private final VaccineRepository vaccineRepository;

    public VaccineController(VaccineRepository vaccineRepository) {
        this.vaccineRepository = vaccineRepository;
    }

    @Operation(summary = "LISTAR TODAS LAS VACUNAS")
    @GetMapping
    public List<Vaccine> listar() {
        return vaccineRepository.findAll();
    }

    @Operation(summary = "BUSCAR VACUNAS POR ID DE MASCOTA")
    @GetMapping("/pet/{petId}")
    public List<Vaccine> listarPorMascota(@PathVariable Long petId) {
        return vaccineRepository.findByPetId(petId);
    }

    @Operation(summary = "BUSCAR VACUNA POR ID")
    @GetMapping("/{id}")
    public ResponseEntity<Vaccine> buscarPorId(@PathVariable Long id) {
        return vaccineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "REGISTRAR VACUNA - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Vaccine crear(@RequestBody Vaccine vaccine) {
        log.info("Laika Vet: Registrando nueva vacuna: {}", vaccine.getName());
        return vaccineRepository.save(vaccine);
    }

    @Operation(summary = "EDITAR/ACTUALIZAR VACUNA")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Vaccine> actualizar(@PathVariable Long id, @RequestBody Vaccine vaccineDetalles) {
        return vaccineRepository.findById(id).map(vaccine -> {
            vaccine.setName(vaccineDetalles.getName());
            vaccine.setApplicationDate(vaccineDetalles.getApplicationDate());
            vaccine.setVeterinarianName(vaccineDetalles.getVeterinarianName());
            vaccine.setPet(vaccineDetalles.getPet());
            return ResponseEntity.ok(vaccineRepository.save(vaccine));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "BORRAR VACUNA")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (vaccineRepository.existsById(id)) {
            vaccineRepository.deleteById(id);
            log.info("Laika Vet: Vacuna eliminada ID: {}", id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
