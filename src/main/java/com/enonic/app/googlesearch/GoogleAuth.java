package com.enonic.app.googlesearch;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.auth.oauth2.GoogleCredentials;

import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.home.HomeDir;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;

public class GoogleAuth
    implements ScriptBean
{
    public static String DEFAULT_JSON_PATH = "${xp.home}/config/google-service-account.json";

    private static final Logger LOG = LoggerFactory.getLogger( GoogleAuth.class );

    private ApplicationService appService;

    public Object getToken()
    {
        try
        {
            Application app = this.appService.get( ApplicationKey.from( getClass() ) );
            String path = app.getConfig()
                .getOrDefault( "google.serviceAccountJson", DEFAULT_JSON_PATH.replace( "${xp.home}", HomeDir.get().toString() ) );

            LOG.debug( "Using google service account file: {}", path );

            File jsonFile = new File( path );
            if ( jsonFile.exists() )
            {
                GoogleCredentials credentials = GoogleCredentials.fromStream( jsonFile.toURI().toURL().openStream() )
                    .createScoped( "https://www.googleapis.com/auth/cloud-platform" );

                credentials.refreshIfExpired();

                return new AccessTokenMapper( credentials.getAccessToken() );
            }
            else
            {
                LOG.warn( "Google service account file does not exist: {}", path );
            }

            return null;
        }
        catch ( IOException e )
        {
            throw new RuntimeException( e );
        }
    }

    @Override
    public void initialize( final BeanContext context )
    {
        this.appService = context.getService( ApplicationService.class ).get();
    }
}
