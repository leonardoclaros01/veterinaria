package veterinaria.laika.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import veterinaria.laika.domain.Food;
import veterinaria.laika.domain.FoodRepository;

import java.util.List;

@Service
public class FoodService {
    private static final Logger log = LoggerFactory.getLogger(FoodService.class);
    private final FoodRepository repository;

    public FoodService(FoodRepository repository) {
        this.repository = repository;
    }

    public List<Food> listar() {
        log.info("Laika Vet: Listando todos los alimentos");
        return repository.findAll();
    }

    public Food guardar(Food food) {
        log.info("Laika Vet: Registrando nuevo alimento: {}", food.getName());
        return repository.save(food);
    }

    public Food actualizar(Long id, Food food) {
        return repository.findById(id).map(existing -> {
            existing.setName(food.getName());
            existing.setBrand(food.getBrand());
            existing.setPrice(food.getPrice());
            existing.setStock(food.getStock());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Alimento no encontrado con ID: " + id));
    }

    public void eliminar(Long id) {
        log.warn("Laika Vet: Eliminando alimento con ID: {}", id);
        repository.deleteById(id);
    }
}
