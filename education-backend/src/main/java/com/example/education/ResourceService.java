
package com.example.education;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ResourceService {

    private final ResourceRepository repository;

    public ResourceService(ResourceRepository repository) {
        this.repository = repository;
    }

    public List<LearningResource> getAllResources() {
        return repository.findAll();
    }

    public LearningResource addResource(LearningResource resource) {
        return repository.save(resource);
    }

    public void deleteResource(Long id) {
        repository.deleteById(id);
    }
}
