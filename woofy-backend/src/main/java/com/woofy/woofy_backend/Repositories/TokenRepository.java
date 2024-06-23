package com.woofy.woofy_backend.Repositories;

import java.util.List;
import java.util.Optional;

import com.woofy.woofy_backend.Models.Entities.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface TokenRepository extends JpaRepository<TokenEntity, Integer> {

    @Query(value = """
      select t from TokenEntity t inner join UserEntity u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<TokenEntity> findAllValidTokenByUser(Integer id);

    Optional<TokenEntity> findByToken(String token);
}
