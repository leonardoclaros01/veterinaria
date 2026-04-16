package veterinaria.laika.services;

import veterinaria.laika.domain.Pet;
import veterinaria.laika.domain.PetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PetService {
    private static final Logger log = LoggerFactory.getLogger(PetService.class);
    private final PetRepository repository;

    public PetService(PetRepository repository) {
        this.repository = repository;
    }

    public List<Pet> listar() {
        log.info("Laika Vet: Listando todas las mascotas");
        return repository.findAll();
    }

    public Pet guardar(Pet pet) {
        log.info("Laika Vet: Registrando nueva mascota: {}", pet.getName());
        return repository.save(pet);
    }

    public Pet actualizar(Long id, Pet pet) {
        return repository.findById(id).map(existing -> {
            existing.setName(pet.getName());
            existing.setSpecies(pet.getSpecies());
            existing.setAge(pet.getAge());
            existing.setOwner(pet.getOwner());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Mascota no encontrada con ID: " + id));
    }

    public void eliminar(Long id) {
        log.warn("Laika Vet: Eliminando mascota con ID: {}", id);
        repository.deleteById(id);
    }
}