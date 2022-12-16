package com.frozik.springbootbackend.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "titles")
public class Title {
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Id
    @Column(name = "title_id")
    private Long id;
    @Column(name = "title_name")
    private String titleName;

}
