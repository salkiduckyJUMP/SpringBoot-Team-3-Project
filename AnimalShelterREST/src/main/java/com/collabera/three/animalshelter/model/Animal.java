package com.collabera.three.animalshelter.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Animal
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Integer id;
	private  String imagePath;
	private String name;
	private String gender;
	private String species;
	private String breed;
	private String size;
	private int age;
	
	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}
	
	public String getImagePath()
	{
		return imagePath;
	}

	public void setImagePath(String imagePath)
	{
		this.imagePath = imagePath;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name) 
	{
		this.name = name;
	}
	
	public String getGender()
	{
		return gender;
	}

	public void setGender(String gender) 
	{
		this.gender = gender;
	}

	public String getSpecies() 
	{
		return species;
	}

	public void setSpecies(String species) 
	{
		this.species = species;
	}

	public String getBreed()
	{
		return breed;
	}

	public void setBreed(String breed) 
	{
		this.breed = breed;
	}

	public String getSize() 
	{
		return size;
	}

	public void setSize(String size)
	{
		this.size = size;
	}

	public int getAge() 
	{
		return age;
	}

	public void setAge(int age)
	{
		this.age = age;
	}
}
