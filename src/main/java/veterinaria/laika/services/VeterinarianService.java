package veterinaria.laika.services;

import veterinaria.laika.domain.Veterinarian;
import veterinaria.laika.domain.VeterinarianRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VeterinarianService {
    private static final Logger log = LoggerFactory.getLogger(VeterinarianService.class);
    private final VeterinarianRepository repository;

    public VeterinarianService(VeterinarianRepository repository) {
        this.repository = repository;
    }

    public List<Veterinarian> listar() {
        log.info("Laika Vet: Consultando staff médico");
        return repository.findAll();
    }

    public Veterinarian guardar(Veterinarian vet) {
        return repository.save(vet);
    }

    public Veterinarian actualizar(Long id, Veterinarian vet) {
        return repository.findById(id).map(existing -> {
            // Usando tus getters exactos:
            existing.setFullName(vet.getFullName());
            existing.setSpecialty(vet.getSpecialty());
            existing.setLicenseNumber(vet.getLicenseNumber());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}