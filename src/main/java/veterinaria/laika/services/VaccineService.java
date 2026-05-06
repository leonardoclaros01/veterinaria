package veterinaria.laika.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import veterinaria.laika.domain.Vaccine;
import veterinaria.laika.domain.VaccineRepository;

import java.util.List;

@Service
public class VaccineService {
    private static final Logger log = LoggerFactory.getLogger(VaccineService.class);
    private final VaccineRepository repository;

    public VaccineService(VaccineRepository repository) {
        this.repository = repository;
    }

    public List<Vaccine> listar() {
        log.info("Laika Vet: Listando todas las vacunas");
        return repository.findAll();
    }

    public List<Vaccine> buscarPorMascota(Long petId) {
        return repository.findByPetId(petId);
    }

    public Vaccine guardar(Vaccine vaccine) {
        log.info("Laika Vet: Registrando nueva vacuna: {} para el veterinario: {}", vaccine.getName(), vaccine.getVeterinarianName());
        return repository.save(vaccine);
    }

    public Vaccine actualizar(Long id, Vaccine vaccine) {
        return repository.findById(id).map(existing -> {
            existing.setName(vaccine.getName());
            existing.setApplicationDate(vaccine.getApplicationDate());
            existing.setVeterinarianName(vaccine.getVeterinarianName());
            existing.setPet(vaccine.getPet());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Vacuna no encontrada con ID: " + id));
    }

    public void eliminar(Long id) {
        log.warn("Laika Vet: Eliminando vacuna con ID: {}", id);
        repository.deleteById(id);
    }
}
