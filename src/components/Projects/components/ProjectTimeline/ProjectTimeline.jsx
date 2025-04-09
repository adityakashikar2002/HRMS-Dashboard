// ProjectTimeline.jsx
import React, { useState, useEffect } from 'react';
import { formatDate, formatDateTime, formatTime } from '../../utils/helpers';
import { getStatusColor, getProgressColor } from '../../utils/helpers';

const ProjectTimeline = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('In Progress');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleProject = (projectId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const calculateCurrentProgress = (project) => {
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);

    if (now <= start) return 0;
    if (now >= end) return 100;

    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const generateStations = (project) => {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const duration = end - start;
    const mid = new Date(start.getTime() + duration / 2);

    return [
      {
        name: 'Start',
        date: project.startDate,
        type: 'start',
        progress: 0,
        time: formatTime(project.startDate)
      },
      {
        name: 'Midpoint',
        date: mid.toISOString(),
        type: 'mid',
        progress: 50,
        time: formatTime(mid)
      },
      {
        name: 'Deadline',
        date: project.endDate,
        type: 'deadline',
        progress: 100,
        time: formatTime(project.endDate)
      }
    ];
  };

  const getDaysLeftMessage = (endDate) => {
    const today = new Date();
    const deadline = new Date(endDate);
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft > 1) return `${daysLeft} days left to reach deadline`;
    if (daysLeft === 1) return `1 day left to reach deadline`;
    if (daysLeft === 0) {
      const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
      if (hoursLeft > 1) return `Due in ${hoursLeft} hours`;
      if (hoursLeft === 1) return `Due in 1 hour`;
      const minsLeft = Math.ceil(timeDiff / (1000 * 60));
      return minsLeft > 0 ? `Due in ${minsLeft} minutes` : 'Due today';
    }

    const hoursPassed = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60));
    if (hoursPassed > 24) {
      const daysPassed = Math.floor(hoursPassed / 24);
      return `Deadline passed ${daysPassed} day${daysPassed !== 1 ? 's' : ''} ago`;
    } else if (hoursPassed > 0) {
      return `Deadline passed ${hoursPassed} hour${hoursPassed !== 1 ? 's' : ''} ago`;
    } else {
      const minsPassed = Math.floor(Math.abs(timeDiff) / (1000 * 60));
      return `Deadline passed ${minsPassed} minute${minsPassed !== 1 ? 's' : ''} ago`;
    }
  };

  const filteredProjects = projects
    .filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((project) =>
      selectedStatus ? project.status.toLowerCase() === selectedStatus.toLowerCase() : true
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Project Timeline</h2>

      {/* Filters */}
      <div className="flex justify-end mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 border border-gray-300 rounded-2xl px-4 py-2"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-40 border border-gray-300 rounded-2xl px-4 py-2"
          >
            <option value="Planning">Planning</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>


      {filteredProjects.length === 0 ? (
        <p className="text-gray-600">No matching projects found</p>
      ) : (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 z-0"></div>

          {filteredProjects.map((project) => {
            const stations = generateStations(project);
            const isExpanded = expandedProjects[project.id];
            const currentProgress = calculateCurrentProgress(project);
            const isDeadlinePassed = new Date() > new Date(project.endDate);
            const timelineColor = isDeadlinePassed ? 'bg-red-500' : 'bg-blue-500';

            return (
              <div key={project.id} className="relative z-10 mb-8">
                <div className="flex items-center cursor-pointer pl-8" onClick={() => toggleProject(project.id)}>
                  <div className="absolute left-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 ml-3">{project.name}</h3>
                  <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
                    {project.status}
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-4 ml-8 pl-8 border-l-2 border-gray-200">
                    <div className="relative h-40 mb-6">
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 transform -translate-y-1/2 rounded-full">
                        <div
                          className={`absolute top-0 left-0 h-full rounded-full ${timelineColor}`}
                          style={{
                            width: `${currentProgress}%`,
                            maxWidth: '100%'
                          }}
                        ></div>
                      </div>

                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-20 h-20 group"
                        style={{
                          left: `${currentProgress}%`,
                          transition: 'left 0.3s ease'
                        }}
                      >
                        <img
                          src="https://em-content.zobj.net/source/skype/289/locomotive_1f682.png"
                          alt="Progress indicator"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <div className="font-semibold">Project Progress</div>
                          <div>{getDaysLeftMessage(project.endDate)}</div>
                          <div>Start: {formatDateTime(project.startDate)}</div>
                          <div>Deadline: {formatDateTime(project.endDate)}</div>
                        </div>
                      </div>

                      {stations.map((station, idx) => (
                        <div
                          key={idx}
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                          style={{ left: `${station.progress}%` }}
                        >
                          <div className="relative">
                            <div className={`w-4 h-4 rounded-full ${station.type === 'deadline' ? 'bg-red-500' : 'bg-blue-500'} border-2 border-white`}></div>
                            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap">
                              <div className="font-medium">{station.name}</div>
                              <div>{formatDate(station.date)}</div>
                              <div>{station.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Start Date</div>
                        <div className="font-medium">{formatDateTime(project.startDate)}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">End Date</div>
                        <div className="font-medium">{formatDateTime(project.endDate)}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500">Progress</div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center">
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span className="text-sm font-medium">Current: {formatDateTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default ProjectTimeline;
