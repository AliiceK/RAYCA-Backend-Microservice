const { sendEmail } = require("../utils/emailService");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const createTicket = async (req, res, next) => {
    try {
        const { title, description, assignedTo } = req.body;

        if (!title || !description) {
            res.status(400);
            throw new Error("Title and description are required.");
        }

        const newTicket = await Ticket.create({
            title,
            description,
            assignedTo,
            createdBy: req.user.id,
        });

        if (assignedTo) {
            const emailMessage = `You have been assigned a new ticket: ${title}`;
            const assignedUser = await User.findById(assignedTo);
            if (assignedUser) {
                await sendEmail(assignedUser.email, "New Ticket Assignment", emailMessage);
            }
        }

        res.status(201).json(newTicket);
    } catch (error) {
        next(error);
    }
};





const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({})
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');
        res.json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ message: "Unable to fetch tickets" });
    }
};



const updateTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, assignedTo } = req.body;

        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { status, assignedTo },
            { new: true }
        );

        if (!ticket) {
            res.status(404);
            throw new Error("Ticket not found.");
        }

        const emailMessage = `Ticket '${ticket.title}' status has been updated to '${status}'.`;
        await sendEmail("alicekaradjian@gmail.com", "Ticket Status Update", emailMessage);

        res.json(ticket);
    } catch (error) {
        next(error);
    }
};



const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByIdAndDelete(id);
        if (!ticket) 
            return res.status(404).json({ message: "Ticket not found" });

        res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        res.status(500).json({ message: "Unable to delete ticket" });
    }
};

module.exports = { createTicket, getTickets, updateTicket, deleteTicket };