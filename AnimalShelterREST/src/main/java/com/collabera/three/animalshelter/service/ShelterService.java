package com.collabera.three.animalshelter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collabera.three.animalshelter.model.Shelter;
import com.collabera.three.animalshelter.repository.ShelterRepo;

@Service
public class ShelterService
{
	@Autowired
	private ShelterRepo shelterRepository;

	public ShelterService(ShelterRepo shelterRepository)
	{
		this.shelterRepository = shelterRepository;
	}
	
	public void addShelter(String shelter_name, Integer addressNo, String street, String township, String state, 
			Integer zip, String image_path)
	{
		Shelter template = new Shelter();
		
		template.setShelter_name(shelter_name);
		template.setAddressNo(addressNo);
		template.setStreet(street);
		template.setTownship(township);
		template.setState(state);
		template.setZIP(zip);
		template.setImage_path(image_path);
		
		shelterRepository.save(template);
	}
	
	public List<Shelter> findAll()
	{
		return shelterRepository.findAll();
	}
	
	public Shelter getShelterById(String shelterid)
	{
		try
		{
			Optional<Shelter> ShelterOpt = shelterRepository.findById(Integer.parseInt(shelterid));
			if(ShelterOpt.isPresent()) return ShelterOpt.get();
		}
		catch(Exception e) 
		{
			
		}
		
		return null;
	}
	
	public void updateShelter(Shelter shelter)
	{
		Optional<Shelter> findById = shelterRepository.findById(shelter.getId());
		if(findById.isPresent())
		{
			Shelter shelterUpdate = findById.get();
			shelterUpdate.setImage_path(shelter.getImage_path());
			shelterUpdate.setShelter_name(shelter.getShelter_name());
			shelterUpdate.setAddressNo(shelter.getAddressNo());
			shelterUpdate.setStreet(shelter.getStreet());
			shelterUpdate.setTownship(shelter.getTownship());
			shelterUpdate.setState(shelter.getState());
			shelterUpdate.setZIP(shelter.getZIP());

			shelterRepository.save(shelterUpdate);
		}
		else
		{
			throw new IllegalArgumentException();
		}
	}
	
	public void deleteShelter(Integer id)
	{
		shelterRepository.deleteById(id);
	}
}