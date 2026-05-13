package veterinaria.laika.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la gestión de comida (foods).
 */
@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
}
