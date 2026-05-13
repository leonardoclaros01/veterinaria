package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.Food;
import veterinaria.laika.domain.FoodRepository;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    private static final Logger log = LoggerFactory.getLogger(FoodController.class);
    private final FoodRepository foodRepository;

    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Operation(summary = "LISTAR TODOS LOS ALIMENTOS")
    @GetMapping
    public List<Food> listar() {
        return foodRepository.findAll();
    }

    @Operation(summary = "BUSCAR ALIMENTO POR ID")
    @GetMapping("/{id}")
    public ResponseEntity<Food> buscarPorId(@PathVariable Long id) {
        return foodRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "REGISTRAR ALIMENTO - SOLO ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Food crear(@RequestBody Food food) {
        log.info("Laika Vet: Registrando nuevo alimento: {}", food.getName());
        return foodRepository.save(food);
    }

    @Operation(summary = "EDITAR/ACTUALIZAR ALIMENTO")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Food> actualizar(@PathVariable Long id, @RequestBody Food foodDetalles) {
        return foodRepository.findById(id).map(food -> {
            food.setName(foodDetalles.getName());
            food.setBrand(foodDetalles.getBrand());
            food.setPrice(foodDetalles.getPrice());
            food.setStock(foodDetalles.getStock());
            return ResponseEntity.ok(foodRepository.save(food));
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "BORRAR ALIMENTO")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            log.info("Laika Vet: Alimento eliminado ID: {}", id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
