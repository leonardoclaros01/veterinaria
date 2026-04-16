package veterinaria.laika.infrastructure;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import veterinaria.laika.domain.User;
import veterinaria.laika.domain.UserRepository;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Operation(summary = "LISTAR DUEÑOS")
    @GetMapping
    public List<User> listar() {
        return userRepository.findAll();
    }

    @Operation(summary = "REGISTRAR DUEÑO")
    @PostMapping
    public User crear(@RequestBody User user) {
        return userRepository.save(user);
    }

    @Operation(summary = "BORRAR DUEÑO")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}