import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminroomsPhoto() {
  const [response, setResponse] = useState([]);
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rooms/getAllRooms`);
        setResponse(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container "  style={{marginTop:"4%",marginBottom:"4%"}}>
      <div className="row justify-content-around">
        {response.map((room, roomIndex) => (
          (room.addedBy === storedUserId) && (
            <div key={roomIndex} className="col-md-4">
              <div className="card mt-4" style={{ width: '100%'}}>
                <div className="card-body p-2">
                  <h3>{room.name}</h3>
                  <div id={`carouselExampleIndicators${roomIndex}`} className="carousel slide" data-ride="carousel" style={{ maxHeight: '150px', overflow: 'hidden' }}>
                    <ol className="carousel-indicators">
                      {room.imageurls.map((url, index) => (
                        <li
                          key={index}
                          data-target={`#carouselExampleIndicators${roomIndex}`}
                          data-slide-to={index}
                          className={index === 0 ? 'active' : ''}
                        ></li>
                      ))}
                    </ol>
                    <div className="carousel-inner">
                      {room.imageurls.map((url, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img className="d-block w-100" src={url} alt={`Slide ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                    <a className="carousel-control-prev" href={`#carouselExampleIndicators${roomIndex}`} role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={`#carouselExampleIndicators${roomIndex}`} role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                  <div className="mt-2">
                    {room.status === "not booked" && room.availability ? (
                       <p>
                       {new Date(room.availability.startDate).toLocaleDateString('en-Uk', {
                         day: 'numeric',
                         
                       })}{" "}
                       -{" "}
                       {new Date(room.availability.endDate).toLocaleDateString('en-UK', {
                         day: 'numeric',
                         month: 'short',
                       })}
                     </p>
                    ) : (
                      <h6>Booked</h6>
                    )}
                    <h6> Rs. {room.rentperday} /night</h6>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default AdminroomsPhoto;
