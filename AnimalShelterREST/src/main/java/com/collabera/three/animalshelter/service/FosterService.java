package com.collabera.three.animalshelter.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collabera.three.animalshelter.model.Foster;
import com.collabera.three.animalshelter.repository.FosterRepository;

@Service
public class FosterService
{	
	@Autowired
	private FosterRepository fosterRepository;

	public FosterService(FosterRepository fosterRepository)
	{
		this.fosterRepository = fosterRepository;
	}
	
	public void addFoster(String name, String animalType, String fosterDescription, String estimatedDateOfBirth, String imagePath)
	{
		Foster tmpFost = new Foster();
		
		tmpFost.setAnimalName(name);
		tmpFost.setAnimalType(animalType);
		tmpFost.setFosterDescription(fosterDescription);
		tmpFost.setEstimatedDateOfBirth(LocalDate.parse(estimatedDateOfBirth));
		tmpFost.setFosterStart(LocalDate.now());
		tmpFost.setImagePath(imagePath);
		
		fosterRepository.save(tmpFost);
	}
	
	public List<Foster> findAll()
	{
		return fosterRepository.findAll();
	}
	
	public Foster getFosterById(String fosterId)
	{
		try
		{
			Optional<Foster> fosterOp = fosterRepository.findById(Integer.parseInt(fosterId));
			
			if(fosterOp.isPresent())
			{
				return fosterOp.get();
			}
			
		}catch(Exception e)
		{
			
		}
		
		return null;
	}
	
	public void updateFoster(Foster foster)
	{
		Optional<Foster> findById = fosterRepository.findById(foster.getId());
		
		if(findById.isPresent())
		{
			Foster fosterToUpdate = findById.get();
			
			fosterToUpdate.setAnimalName(foster.getAnimalName());
			fosterToUpdate.setAnimalType(foster.getAnimalType());
			fosterToUpdate.setEstimatedDateOfBirth(foster.getEstimatedDateOfBirth());
			fosterToUpdate.setFosterDescription(foster.getFosterDescription());
			fosterToUpdate.setFosterStart(foster.getFosterStart());
			fosterToUpdate.setImagePath(foster.getImagePath());
			
			fosterRepository.save(fosterToUpdate);
		}
		else
		{
			throw new IllegalArgumentException();
		}
	}
	
	public void deleteFoster(Integer id)
	{
		fosterRepository.deleteById(id);
	}
}