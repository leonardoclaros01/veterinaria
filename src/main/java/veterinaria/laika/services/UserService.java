package veterinaria.laika.services;

import veterinaria.laika.domain.User;
import veterinaria.laika.domain.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> listar() {
        log.info("Laika Vet: Consultando lista de usuarios");
        return repository.findAll();
    }

    public User guardar(User user) {
        return repository.save(user);
    }

    public User actualizar(Long id, User user) {
        return repository.findById(id).map(existing -> {
            // Usando tus getters exactos:
            existing.setNombre(user.getNombre());
            existing.setApellido(user.getApellido());
            existing.setEmail(user.getEmail());
            // No actualizamos el rol ni el ID por seguridad
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}