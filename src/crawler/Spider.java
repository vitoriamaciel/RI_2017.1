package crawler;

import java.util.List;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

public class Spider {

	private static final int MAX_PAGES_TO_SEARCH = 3;
	private Set<String> pagesVisited = new HashSet<String>();
	private List<String> pagesToVisit = new LinkedList<String>();
	public String saida = "";
	private Set<String> links = new HashSet<String>();
	private List<String> said = new LinkedList<String>();
	
	private Set<String> paginas = new HashSet<String>();

	
	int count = 0;


	private String nextUrl(){
		String nextUrl;
		do
		{
			nextUrl = this.pagesToVisit.remove(0);
		} while(this.pagesVisited.contains(nextUrl));

		this.pagesVisited.add(nextUrl);
		return nextUrl;
	}

	public Set<String> search(String url)
	{
		while(count < MAX_PAGES_TO_SEARCH)
		{
			String currentUrl;
			SpiderLeg leg = new SpiderLeg();
			if(this.pagesToVisit.isEmpty())
			{
				currentUrl = url;
				this.pagesVisited.add(url);

			}
			else
			{
				currentUrl = this.nextUrl();
			}
			if ( leg.crawl(currentUrl)) {
				paginas.add(leg.getHTML());

			} 
			links.addAll(leg.getLinks());

			this.pagesToVisit.addAll(leg.getLinks());
			count++;
		}
		said.addAll(links);
		for (int i = 0; i < said.size(); i++) {
			saida = saida + said.get(i)+ "\n";
		}
		
	
		System.out.println(String.format("**Done** Visited %s web page(s)", this.pagesVisited.size()));
		return paginas;
	}
}
