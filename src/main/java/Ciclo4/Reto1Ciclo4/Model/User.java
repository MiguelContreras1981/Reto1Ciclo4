/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Ciclo4.Reto1Ciclo4.Model;

import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import lombok.Data;

/**
 *
 * @author Luis Miguel Carreazo
 */
@Entity//representa unos datos de una base de datos
@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Table(name="user",indexes = @Index(name="indx_email",columnList = "user_email",unique = true))
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NonNull
    @Column(name = "user_email",nullable = false,length = 50)
    private String email;
    @NonNull
    @Column(name = "user_password",nullable = false,length = 50)
    private String password;
    @NonNull
    @Column(name = "user_name",nullable = false,length = 80)
    private String name;


}
