/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Ciclo4.Reto1Ciclo4.repository.crud;

import Ciclo4.Reto1Ciclo4.Model.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Luis Miguel Carreazo
 */
public interface  UserCrudRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail (String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    //Optional<User> findByName(String name);
    
}
