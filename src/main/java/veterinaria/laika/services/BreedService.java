package veterinaria.laika.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import veterinaria.laika.domain.Breed;
import veterinaria.laika.domain.BreedRepository;

import java.util.List;

@Service
public class BreedService {
    private static final Logger log = LoggerFactory.getLogger(BreedService.class);
    private final BreedRepository repository;

    public BreedService(BreedRepository repository) {
        this.repository = repository;
    }

    public List<Breed> listar() {
        log.info("Laika Vet: Listando todas las razas");
        return repository.findAll();
    }

    public List<Breed> buscarPorEspecie(String species) {
        return repository.findBySpecies(species);
    }

    public Breed guardar(Breed breed) {
        log.info("Laika Vet: Registrando nueva raza: {}", breed.getName());
        return repository.save(breed);
    }

    public Breed actualizar(Long id, Breed breed) {
        return repository.findById(id).map(existing -> {
            existing.setName(breed.getName());
            existing.setSpecies(breed.getSpecies());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Raza no encontrada con ID: " + id));
    }

    public void eliminar(Long id) {
        log.warn("Laika Vet: Eliminando raza con ID: {}", id);
        repository.deleteById(id);
    }
}
