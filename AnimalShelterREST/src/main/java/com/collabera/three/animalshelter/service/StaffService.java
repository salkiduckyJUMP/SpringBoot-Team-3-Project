package com.collabera.three.animalshelter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collabera.three.animalshelter.model.Staff;
import com.collabera.three.animalshelter.repository.StaffRepository;


@Service
public class StaffService
{
	@Autowired
	private StaffRepository staffRepository;
	
	public StaffService(StaffRepository staffRepository)
	{
		this.staffRepository = staffRepository;
	}
	
	public void addStaff(String imagePath, String name, String title)
	{
		Staff tempStaff = new Staff();
		
		tempStaff.setImagePath(imagePath);
		tempStaff.setName(name);
		tempStaff.setTitle(title);
		
		staffRepository.save(tempStaff);
	}
	
	public List<Staff> findAll()
	{
		return staffRepository.findAll();
	}

	public Staff getStaffById(String staffId)
	{
		
		try
		{
			Optional<Staff> staffOptional = staffRepository.findById(Integer.parseInt(staffId));
			
			if(staffOptional.isPresent())
			{
				return staffOptional.get();
			}
			
		}catch(Exception e)
		{
			
		}
		
		return null;
	}
	
	public void updateStaff(Staff staff)
	{
		Optional<Staff> findById = staffRepository.findById(staff.getId());
		
		if(findById.isPresent())
		{
			Staff staffToUpdate = findById.get();
			
			staffToUpdate.setImagePath(staff.getImagePath());
			staffToUpdate.setName(staff.getName());
			staffToUpdate.setTitle(staff.getTitle());

			staffRepository.save(staffToUpdate);
		}
		else
		{
			throw new IllegalArgumentException();
		}
	}
	
	public void deleteStaff(Integer id)
	{
		staffRepository.deleteById(id);
	}
}