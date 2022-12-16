package com.frozik.springbootbackend.repository;

import com.frozik.springbootbackend.domain.Title;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TitleRepository extends JpaRepository<Title, Long> {
}
