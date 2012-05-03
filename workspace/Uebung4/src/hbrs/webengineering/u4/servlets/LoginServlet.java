package hbrs.webengineering.u4.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {       

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String password = request.getParameter("password");
		
		if (password.equals("secret!")) {
			HttpSession session = request.getSession(true);
			session.setAttribute("authenticated", true);
			response.sendRedirect(request.getContextPath() + "/tracker.html");
		} else {
			response.sendRedirect(request.getContextPath() + "/login.html");
		}
	}

}
