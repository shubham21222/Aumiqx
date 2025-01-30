"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/admin/components/DashboardLayout";

const TeamsManager = () => {
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({ name: "", designation: "", img: "" });
    const [skillFormData, setSkillFormData] = useState({ skillName: "", progress: 0 });
    const [editId, setEditId] = useState(null);
    const [editSkillId, setEditSkillId] = useState(null);
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    // Fetch teams and their skills
    useEffect(() => {
        fetch("http://localhost:5000/api/teams")
            .then((res) => res.json())
            .then((data) => setTeams(data))
            .catch((err) => console.error(err));
    }, []);

    // Handle input change for team form
    const handleTeamChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle input change for skill form
    const handleSkillChange = (e) => {
        setSkillFormData({ ...skillFormData, [e.target.name]: e.target.value });
    };

    // Add or update team
    const handleTeamSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? "PUT" : "POST";
        const url = editId ? `http://localhost:5000/api/teams/${editId}` : "http://localhost:5000/api/teams";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const newTeam = await response.json();

        if (editId) {
            setTeams(teams.map((t) => (t._id === editId ? newTeam : t)));
        } else {
            setTeams([...teams, newTeam]);
        }

        setFormData({ name: "", designation: "", img: "" });
        setEditId(null);
    };

    // Add or update skill
    const handleSkillSubmit = async (e) => {
        e.preventDefault();
        const method = editSkillId ? "PUT" : "POST";
        const url = editSkillId
            ? `http://localhost:5000/api/teams/${selectedTeamId}/skills/${editSkillId}`
            : `http://localhost:5000/api/teams/${selectedTeamId}/skills`;

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(skillFormData),
        });

        const newSkill = await response.json();

        if (editSkillId) {
            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team._id === selectedTeamId
                        ? {
                              ...team,
                              skills: team.skills.map((s) => (s._id === editSkillId ? newSkill : s)),
                          }
                        : team
                )
            );
        } else {
            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team._id === selectedTeamId
                        ? { ...team, skills: [...team.skills, newSkill] }
                        : team
                )
            );
        }

        setSkillFormData({ skillName: "", progress: 0 });
        setEditSkillId(null);
    };

    // Delete team
    const handleTeamDelete = async (id) => {
        await fetch(`http://localhost:5000/api/teams/${id}`, { method: "DELETE" });
        setTeams(teams.filter((t) => t._id !== id));
    };

    // Delete skill
    const handleSkillDelete = async (teamId, skillId) => {
        await fetch(`http://localhost:5000/api/teams/${teamId}/skills/${skillId}`, {
            method: "DELETE",
        });
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team._id === teamId
                    ? { ...team, skills: team.skills.filter((s) => s._id !== skillId) }
                    : team
            )
        );
    };

    // Set team for editing
    const handleTeamEdit = (team) => {
        setFormData({ name: team.name, designation: team.designation, img: team.img });
        setEditId(team._id);
    };

    // Set skill for editing
    const handleSkillEdit = (teamId, skill) => {
        setSkillFormData({ skillName: skill.skillName, progress: skill.progress });
        setEditSkillId(skill._id);
        setSelectedTeamId(teamId);
    };

    return (
        <DashboardLayout>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Teams and Skills</h2>

                {/* Form for Adding/Editing Teams */}
                <form onSubmit={handleTeamSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleTeamChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={formData.designation}
                            onChange={handleTeamChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="img"
                            placeholder="Image URL"
                            value={formData.img}
                            onChange={handleTeamChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {editId ? "Update Team" : "Add Team"}
                        </button>
                    </div>
                </form>

                {/* Form for Adding/Editing Skills */}
                <form onSubmit={handleSkillSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="skillName"
                            placeholder="Skill Name"
                            value={skillFormData.skillName}
                            onChange={handleSkillChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            name="progress"
                            placeholder="Progress (0-100)"
                            value={skillFormData.progress}
                            onChange={handleSkillChange}
                            required
                            min="0"
                            max="100"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            {editSkillId ? "Update Skill" : "Add Skill"}
                        </button>
                    </div>
                </form>

                {/* Display Teams and Their Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <div
                            key={team._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={team.img}
                                alt={team.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{team.name}</h3>
                            <p className="text-gray-600 mb-4">{team.designation}</p>
                            <div className="space-y-2">
                                {team.skills.map((skill) => (
                                    <div key={skill._id} className="flex justify-between items-center">
                                        <span className="text-gray-700">{skill.skillName}</span>
                                        <span className="text-gray-600">{skill.progress}%</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleSkillEdit(team._id, skill)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleSkillDelete(team._id, skill._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center space-x-3 mt-4">
                                <button
                                    onClick={() => handleTeamEdit(team)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Edit Team
                                </button>
                                <button
                                    onClick={() => handleTeamDelete(team._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete Team
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeamsManager;