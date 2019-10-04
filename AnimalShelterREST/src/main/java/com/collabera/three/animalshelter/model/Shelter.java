package com.collabera.three.animalshelter.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Shelter
{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String shelter_name;
	private Integer addressNo;
	private String street;
	private String township;
	private String state;
	private Integer zip;
	private String image_path;

	
	public String getImage_path()
	{
		return image_path;
	}

	public void setImage_path(String image_path)
	{
		this.image_path = image_path;
	}
	
	public Integer getId()
	{
		return id;
	}
	
	public void setId(Integer id)
	{
		this.id = id;
	}
	
	public String getShelter_name()
	{
		return shelter_name;
	}
	
	public void setShelter_name(String shelter_name)
	{
		this.shelter_name = shelter_name;
	}
	
	public Integer getAddressNo()
	{
		return addressNo;
	}
	
	public void setAddressNo(Integer addressNo)
	{
		this.addressNo = addressNo;
	}
	
	public String getStreet()
	{
		return street;
	}
	
	public void setStreet(String street)
	{
		this.street = street;
	}
	
	public String getTownship()
	{
		return township;
	}
	
	public void setTownship(String township)
	{
		this.township = township;
	}
	
	public String getState()
	{
		return state;
	}
	
	public void setState(String state)
	{
		this.state = state;
	}
	
	public Integer getZIP()
	{
		return zip;
	}
  
	public void setZIP(Integer zip)
	{
		this.zip = zip;
	}
}
