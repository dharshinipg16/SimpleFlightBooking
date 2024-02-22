import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import modal components

const Booking = () => {
    const [booking, setBooking] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFlight, setSelectedFlight] = useState(null); // To track the selected flight

    useEffect(() => {
        axios.get('http://localhost:3000/auth/booking')
            .then(result => {
                if (result.data.Status) {
                    setBooking(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle click on flight name
    const handleFlightClick = (flight) => {
        setSelectedFlight(flight);
    };

    // Function to close the modal
    const handleClose = () => {
        setSelectedFlight(null);
    };

    const bookSlot = (flight) => {
        axios.post('http://localhost:3000/auth/bookslot', { name: flight.name })
            .then(result => {
                // Update the booking state to reflect the changes in available slots and booked slots
                setBooking(prevBooking =>
                    prevBooking.map(b =>
                        b.name === flight.name
                            ? { ...b, availableslots: b.availableslots - 1, booked: b.booked + 1 }
                            : b
                    )
                );
                handleClose(); // Close the modal after booking
            })
            .catch(err => console.log(err));
    };

    // Function to filter flights based on the search term
    const filteredFlights = booking.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.arrival.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>AVAILABLE FLIGHTS</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>
                Add Location to wishList
            </Link>

            {/* Search bar */}
            <div className="mt-3">
                <input
                    type="text"
                    placeholder="Search flights..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                />
            </div>

            {/* Display filtered flights */}
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Available slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlights.map(b => (
                            <tr key={b.id}>
                                <td>
                                    <button onClick={() => handleFlightClick(b)}>
                                        {b.name}
                                    </button>
                                </td>
                                <td>{b.source}</td>
                                <td>{b.destination}</td>
                                <td>{b.departure}</td>
                                <td>{b.arrival}</td>
                                <td>{b.availableslots}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal to display flight details */}
            <Modal show={selectedFlight !== null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedFlight?.name} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display flight details here */}
                    <p>Source: {selectedFlight?.source}</p>
                    <p>Destination: {selectedFlight?.destination}</p>
                    <p>Departure: {selectedFlight?.departure}</p>
                    <p>Arrival: {selectedFlight?.arrival}</p>
                    {/* Add other flight details as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => bookSlot(selectedFlight)}>
                        Book Now!
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Booking;
