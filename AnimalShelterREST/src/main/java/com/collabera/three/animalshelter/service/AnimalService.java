package com.collabera.three.animalshelter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collabera.three.animalshelter.model.Animal;
import com.collabera.three.animalshelter.repository.AnimalRepository;

@Service
public class AnimalService 
{
	@Autowired
	private AnimalRepository animalRepository;
	
	public AnimalService(AnimalRepository animalRepository)
	{
		this.animalRepository = animalRepository;
	}
	
	public void addAnimal(String imagePath, String name, String gender, String species, String breed, String size, int age)
	{
		Animal tempAnimal = new Animal();
		
		tempAnimal.setImagePath(imagePath);
		tempAnimal.setName(name);
		tempAnimal.setGender(gender);
		tempAnimal.setSpecies(species);
		tempAnimal.setBreed(breed);
		tempAnimal.setSize(size);
		tempAnimal.setAge(age);
		
		animalRepository.save(tempAnimal);
	}
	
	public List<Animal> findAll()
	{
		return animalRepository.findAll();
	}
	
	public Animal getAnimalById(String animalId)
	{
		
		try
		{
			Optional<Animal> animalOptional = animalRepository.findById(Integer.parseInt(animalId));
			
			if(animalOptional.isPresent())
			{
				return animalOptional.get();
			}
			
		}catch(Exception e)
		{
			
		}
		
		return null;
	}
	
	public void updateAnimal(Animal animal)
	{
		Optional<Animal> findById = animalRepository.findById(animal.getId());
		
		if(findById.isPresent())
		{
			Animal animalToUpdate = findById.get();
			
			animalToUpdate.setImagePath(animal.getImagePath());
			animalToUpdate.setName(animal.getName());
			animalToUpdate.setGender(animal.getGender());
			animalToUpdate.setSpecies(animal.getSpecies());
			animalToUpdate.setBreed(animal.getBreed());
			animalToUpdate.setSize(animal.getSize());
			animalToUpdate.setAge(animal.getAge());

			animalRepository.save(animalToUpdate);
		}
		else
		{
			throw new IllegalArgumentException();
		}
		
	}

	public void deleteAnimal(Integer id)
	{
		animalRepository.deleteById(id);
	}
}