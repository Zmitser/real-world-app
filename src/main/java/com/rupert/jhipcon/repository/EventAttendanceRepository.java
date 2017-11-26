package com.rupert.jhipcon.repository;

import com.rupert.jhipcon.domain.EventAttendance;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EventAttendance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventAttendanceRepository extends JpaRepository<EventAttendance, Long> {

}
