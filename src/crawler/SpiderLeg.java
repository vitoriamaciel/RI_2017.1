package crawler;

import java.io.IOException;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class SpiderLeg
{
    // We'll use a fake USER_AGENT so the web server thinks the robot is a normal web browser.
    private static final String USER_AGENT =
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1";
    private Set<String> links2 =  new HashSet<>();
    private Document htmlDocument;


    /**
     * This performs all the work. It makes an HTTP request, checks the response, and then gathers
     * up all the links on the page. Perform a searchForWord after the successful crawl
     * 
     * @param url
     *            - The URL to visit
     * @return whether or not the crawl was successful
     */
    public boolean crawl(String url){
        try{
        	
            Connection connection = Jsoup.connect(url).userAgent(USER_AGENT);
            Document htmlDocument = connection.get();
            this.htmlDocument = htmlDocument;
            if(connection.response().statusCode() == 200) // 200 is the HTTP OK status code
                                                          // indicating that everything is great.
            {
                System.out.println("\n**Visiting** Received web page at " + url);
            }
            if(!connection.response().contentType().contains("text/html"))
            {
                System.out.println("**Failure** Retrieved something other than HTML");
                return false;
            }
            Elements linksOnPage = htmlDocument.select("a[href]");
            System.out.println("Found (" + linksOnPage.size() + ") links");
            for(Element link : linksOnPage)
            {
            	if (link.text().contains("vinho") || link.text().contains("Descrição") || link.text().contains("comprar") || 
            			((link.absUrl("href").endsWith("html"))) || (link.absUrl("href").contains("/vinho"))) {
            		//System.out.println(link.text());
            		this.links2.add(link.absUrl("href"));
				}
            	                
            }
            System.out.println(this.links2.size());

            if (this.links2.size() > 0) {
				return true;
			}else{
				return false;
			}
        }
        catch(IOException ioe)
        {
            // We were not successful in our HTTP request
            return false;
        }
    }
    
    public String getL() {
        List<String> links = new LinkedList<String>();
        links.addAll(links2);

    	
    	String aux = "";
		for (int i = 0; i < links.size(); i++) {
			aux = aux + links.get(i)+ "\n";
		}
		return aux;
	}

    public String getHTML() {
		return this.htmlDocument.html();
	}

    public Set<String> getLinks()
    {
        return this.links2;
    }

}
