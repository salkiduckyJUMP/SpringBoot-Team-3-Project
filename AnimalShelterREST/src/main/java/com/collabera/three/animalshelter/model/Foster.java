package com.collabera.three.animalshelter.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Foster
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String animalName;
	private String animalType;
	private LocalDate estimatedDateOfBirth;
	private LocalDate fosterStart;
	private String fosterDescription;
	private String imagePath;

	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public String getAnimalName()
	{
		return animalName;
	}

	public void setAnimalName(String animalName)
	{
		this.animalName = animalName;
	}

	public String getAnimalType()
	{
		return animalType;
	}

	public void setAnimalType(String animalType)
	{
		this.animalType = animalType;
	}
	
	public LocalDate getEstimatedDateOfBirth()
	{
		return estimatedDateOfBirth;
	}

	public void setEstimatedDateOfBirth(LocalDate estimatedDateOfBirth)
	{
		this.estimatedDateOfBirth = estimatedDateOfBirth;
	}

	public LocalDate getFosterStart()
	{
		return fosterStart;
	}

	public void setFosterStart(LocalDate fosterStart)
	{
		this.fosterStart = fosterStart;
	}
	
	public String getFosterDescription()
	{
		return fosterDescription;
	}

	public void setFosterDescription(String fosterDescription)
	{
		this.fosterDescription = fosterDescription;
	}
	
	public String getImagePath()
	{
		return imagePath;
	}

	public void setImagePath(String imagePath)
	{
		this.imagePath = imagePath;
	}
}
