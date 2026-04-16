package veterinaria.laika.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la gestión de usuarios (dueños) en Laika Veterinaria.
 * Hereda de JpaRepository para proporcionar CRUD automático en MySQL.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Aquí puedes añadir búsquedas por email para el login más adelante
}