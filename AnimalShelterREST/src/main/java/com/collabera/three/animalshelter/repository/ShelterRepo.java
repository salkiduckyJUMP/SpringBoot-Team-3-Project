package com.collabera.three.animalshelter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.collabera.three.animalshelter.model.Shelter;

public interface ShelterRepo extends JpaRepository<Shelter, Integer> {

}