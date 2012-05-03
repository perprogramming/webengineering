package hbrs.webengineering.u4.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter("/*")
public class LoginFilter implements Filter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		String requestedPath = httpRequest.getServletPath();
		
		if (
				(!requestedPath.equals("/login.html")) && (!requestedPath.equals("/LoginServlet"))
		) {	
			HttpSession session = httpRequest.getSession(false);
			if ((session == null) || ((Boolean) session.getAttribute("authenticated") == false)) {
				httpResponse.sendRedirect(httpRequest.getContextPath() + "/login.html");
				return;
			}
		}
		
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
