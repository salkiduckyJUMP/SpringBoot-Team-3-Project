package com.collabera.three.animalshelter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.collabera.three.animalshelter.model.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Integer>{

}